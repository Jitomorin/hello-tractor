import styled from "styled-components";
import { media } from "utils/media";

export default function Map() {
  return (
    <MapWrapper>
      <MapAdress
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.80606406383!2d36.944843500000005!3d-1.1943440999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f8e4b8ad947%3A0x9504ecc7473b7b93!2sKahawa%20Sukari!5e0!3m2!1sen!2ske!4v1703327989842!5m2!1sen!2ske"
        height="450"
        loading="eager"
      ></MapAdress>
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  display: flex;
  width: 100%;
  ${media("<=desktop")} {
    width: 100%;
  }
`;
const MapAdress = styled.iframe`
  border: none;
  width: 100%;
`;
