import SignedOnNfts from "../components/SoulSigns/SignedOnNfts"
import Main from "../layouts/Main"
import { useParams } from "react-router-dom";

const SignedOn = () => {
  const params = useParams();
  console.log(params);

  return (
    <Main>
      <div>
        <SignedOnNfts account={params.address}/>
      </div>
    </Main>
  )
}

export default SignedOn;