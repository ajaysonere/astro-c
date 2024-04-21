/* eslint-disable react/prop-types */
import { useState , useContext, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { userContext } from "../contexts/UserContext";
import {useNavigate} from 'react-router-dom';


function Openpdf({ pdf, pageWidth }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();
  
  const token = currentUser?.token;
  
  useEffect(() => {
      if(!token){
         navigate("/login");
      }
  } , [])
  

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf__container">
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page, i) => {
            return (
              <Page
                key={i}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={pageWidth}
              />
            );
          })}
      </Document>
    </div>
  );
}

export default Openpdf;
