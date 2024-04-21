import { useParams } from "react-router-dom";
import { pdfjs } from "react-pdf";
import Openpdf from "./Openpdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

/*
    This componet will help us show the newsLetter in web app it self.
    
*/

const ShowNewsletter = () => {
  const { name } = useParams();
  const result = `http://13.202.1.121:4500/uploads/${name}`;

  return (
    <section className="container">
      <div className="shownewsletter__container">
        <h1>Newsletter</h1>
        <Openpdf pdf={result} pageWidth={1000} />
      </div>
    </section>
  );
};

export default ShowNewsletter;
