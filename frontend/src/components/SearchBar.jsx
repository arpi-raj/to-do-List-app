export default function SearchBar({onChange}) {
  return (
    <>
      <div className="flex justify-between">
        <input onChange={onChange}
          className="flex items-end w-full rounded-md mx-2 my-2 py-1 px-1 h-10 placeholder-black bg-slate-300"
          placeholder="Search All Users"
        ></input>
        <button className="pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
