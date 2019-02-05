let CSS = `

  p,
  h1, h2, h3, h4, h5, h6 {
    -ntz-processor--type: "text";
    -ntz-style--display: "block";
  }

  span {
    -ntz-processor--type: "inline";
    -ntz-processor--title: "";
  }

  p {
    -ntz-processor--title: "p";
  }

  h1 {
    -ntz-processor--title: "h1";
  }
  h2 {
    -ntz-processor--title: "h2";
  }
  h3 {
    -ntz-processor--title: "h3";
  }
  h4 {
    -ntz-processor--title: "h4";
  }
  h5 {
    -ntz-processor--title: "h5";
  }
  h6 {
    -ntz-processor--title: "h6";
  }

  img {
    -ntz-processor--type: "block";

    -ntz-processor--title: "img";

    -ntz-style--width: 200;
    -ntz-style--height: auto;

    -ntz-style--background-position: 0 0;
    -ntz-style--background-size: 200 auto;

    -ntz-style--background-PDFCropBounds: 0 0 595 842;
    -ntz-style--background-PDFCropName: CropMedia;
  }

  table {
    -ntz-processor--title: "Table Regular";
  }

  tr {
    -ntz-processor--title: "tr";
  }
  td {
    -ntz-processor--title: "Cell Regular";
    -ntz-style--width: auto;
  }
  th {
    -ntz-processor--title: "Cell Header";
    -ntz-style--width: auto;
  }
`
module.exports = CSS;
