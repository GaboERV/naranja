const Aside = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-orange-900 to-orange-700 h-full py-8 px-6 flex flex-col overflow-y-auto">
    <h1 className="text-orange-50 text-3xl font-bold mb-12 text-center">
      Naranja
    </h1>

    <button
      className="flex items-center space-x-3 text-orange-50 font-medium bg-orange-800/40 p-4 rounded-lg hover:bg-orange-800/60 transition-all duration-200 shadow-lg"
      onClick={() => window.location.reload()}
    >
      <span>Inicio</span>
    </button>
  </aside>

  );
}
export default Aside;