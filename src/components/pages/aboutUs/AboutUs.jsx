import { Box } from "@mui/material";
import "../../../assets/css/generalStyles.css";
import "./aboutUs.css";
export const AboutUs = () => {
  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Nosotros</Box>
      <Box className="aboutUsContainer">
        <Box className="text1">
          En Nativo, somos una dietética con raíces en San Nicolás de los
          Arroyos, nacida del deseo de promover un estilo de vida más saludable,
          consciente y natural. Creemos firmemente que una buena alimentación es
          la base del bienestar físico y emocional, por eso trabajamos cada día
          para acercarte productos seleccionados con responsabilidad,
          priorizando la calidad, el origen y el impacto en el entorno.
        </Box>
        <img
          className="image1"
          src="/images/foodImage.jpg"
          width={300}
          alt="acerca-de-nosotros"
        />
        <Box className="text2">
          Nuestro local ofrece una amplia variedad de alimentos naturales,
          integrales, orgánicos, sin TACC, veganos, y suplementos dietarios
          pensados para acompañar distintas necesidades nutricionales. Desde
          harinas y semillas hasta productos congelados y bebidas vegetales, en
          Nativo buscamos ser un espacio donde cada persona pueda encontrar
          opciones saludables para su día a día, sin resignar sabor ni disfrute.
        </Box>
        <img
          className="image2"
          src="/images/foodImage2.jpg"
          width={300}
          alt="acerca-de-nosotros"
        />
        <Box className="text3">
          Más allá de los productos, en Nativo valoramos el trato humano, el
          asesoramiento personalizado y la construcción de una comunidad que se
          interesa por su bienestar. Nos esforzamos en brindar atención cercana,
          responder dudas y ofrecer orientación con calidez y compromiso. Porque
          creemos que comer bien no es una moda, sino un acto cotidiano de amor
          propio y respeto por el entorno.
        </Box>
        <img
          className="image3"
          src="/images/foodImage3.jpg"
          width={300}
          alt="acerca-de-nosotros"
        />
      </Box>
    </Box>
  );
};
