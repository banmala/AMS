import Table from "@/components/Table";

export default function Music () {
    const columns = ["Name", "Email", "Role"];
    const data = [
      { Id:1, Name: "John Doe", Email: "john@example.com", Role: "Admin" },
      { Id:2, Name: "Jane Smith", Email: "jane@example.com", Role: "User" },
      { Id:3, Name: "Michael Lee", Email: "michael@example.com", Role: "Moderator" },
    ];
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">User Table</h1>
        <Table columns={columns} data={data} />
      </div>
    );
}