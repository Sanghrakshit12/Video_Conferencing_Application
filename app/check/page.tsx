import axios from "axios";

async function getUserdata() {
  const response = await axios.get("http://localhost:3000/api/user");
  return response.data;
}

export default async function Home() {
  const userData = await getUserdata();

  return (
    <div>
      {userData.email}
      <br />
      {userData.username}
    </div>
  );
}
