import { useParams, useNavigate } from "react-router";

const AdDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <div>
            <p>{id}</p>
            <button className="button" onClick={() => navigate("/")}>Home page</button>
        </div>
    );
};

export default AdDetails;