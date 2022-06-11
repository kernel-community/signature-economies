import SignedOnNfts from "../components/SoulSigns/SignedOnNfts"
import Main from "../layouts/Main"
import { useParams } from "react-router-dom";

const SignedOn = () => {
  const params = useParams();
  console.log(params);

  return (
    <Main>
      <div className="flex flex-col gap-y-4 w-screen p-8">
        <SignedOnNfts account={params.address}/>
      </div>
    </Main>
  )
}

export default SignedOn;