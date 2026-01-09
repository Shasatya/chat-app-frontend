import SidebarNav from "../components/SidebarNav";

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-chat-list">
      <SidebarNav />
      <div className="w-80 bg-chat-list flex flex-col shadow-xl z-10">HEYY</div>
    </div>
  );
};

export default Home;
