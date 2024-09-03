export default function Profile() {
  return (
    <div className="bg-red-700" >
      <div className="bg-red-700 flex items-center">
        <button className="rounded-full my-1 mx-1 h-16 w-16 flex-shrink-0"></button>
        <h1 className="flex ml-2">userName</h1>
      </div>
      <div>
      <p className="text-2xl">Change Password</p>
      <p className="text-2xl">Change User Name</p>
      </div>
    </div>
  );
}
