import { getServerSession } from "next-auth";

const OrderPage = async () => {
  const session = await getServerSession();
  console.log("session", session);

  return (
    <div>
      <h1> Order app</h1>
    </div>
  );
};

export default OrderPage;
