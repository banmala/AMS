import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-5xl font-light font-nunito">
        Welcome to My Home Page
      </h1>
      <button onClick={()=>{
        navigate("/dashboard");
      }}>
        To Dashboard
      </button>
    </div>
  );
};

export default Home;
