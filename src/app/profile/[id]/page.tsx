export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile </h1>
      <br />
      <p className="text-4xl">   Profile
        <span className="p-2 rounded-lg bg-orange-600 ml-2">
        {params.id}
        </span>
      </p>
    </div>
  );
}
