import { useEffect, useState } from "react";
import { formatDistanceToNow, parseJSON } from "date-fns";
import { MdInsertDriveFile } from "react-icons/md";
import socket from "socket.io-client";
import Dropzone from "react-dropzone";
import pt from "date-fns/locale/pt";

import api from "../../services/api";

import logo from "../../assets/logo.png";
import "./styles.css";

const Box = props => {
  const { id } = props.match.params;
  const [box, setBox] = useState({});

  useEffect(() => {
    (async () => {
      subscribeToNewFiles();

      const response = await api.get(`boxes/${id}`);

      setBox(response.data);
    })();
  }, []);

  const handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();

      data.append("file", file);

      api.post(`boxes/${id}/files`, data);
    });
  };

  const subscribeToNewFiles = () => {
    const io = socket("http://localhost:3333");

    io.emit("connectRoom", id);

    io.on("file", data => {
      setBox(boxState => ({ ...boxState, files: [data, ...boxState.files] }));
    });
  };

  return (
    <div id="box-container">
      <header>
        <img src={logo} alt="logo" />
        <h1>{box.title}</h1>
      </header>

      <Dropzone onDropAccepted={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <div className="upload" {...getRootProps()}>
            <input {...getInputProps()} />

            <p>Arraste arquivos ou clique aqui</p>
          </div>
        )}
      </Dropzone>

      <ul>
        {box.files &&
          box.files.map(file => (
            <li key={file._id}>
              <a
                className="fileInfo"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdInsertDriveFile size={24} color="#a5cfff" />
                <strong>{file.title}</strong>
              </a>

              <span>
                há{" "}
                {formatDistanceToNow(parseJSON(file.createdAt), { locale: pt })}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Box;
