function Container() {
  const series = [
    {
      id: 1,
      name: "Into The Badlands",
    },
    {
      id: 2,
      name: "Seal Six",
    },
    {
      id: 3,
      name: "The Last Ship",
    },
    {
      id: 4,
      name: "The Last Resort",
    },
  ];
  return (
    <div className="w-full flex justify-around p-2">
      {series.map((serie) => {
        return (
          <div
            key={serie.id}
            className={`flex p-2 rounded-md cursor-pointer transition ease-out delay-75 hover:scale-125 justify-center items-center max-w-max bg-gradient-to-br ${
              serie.id % 2 === 0
                ? "from-[#202221] to-[#283A34]"
                : "from-[#22211F] to-[#442E29]"
            }`}
          >
            <p className="font-thin">{serie.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Container;
