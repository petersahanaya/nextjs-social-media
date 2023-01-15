const Loading = () => {
    const loadArr = [1, 2, 3]
  return (
    <main className="w-screen bg-slate-100 pb-[7rem]">
        <header className="w-screen h-[11vh] bg-white flex justify-around items-center p-3">
            <section className="flex items-center gap-2">
                <div className="w-[3rem] h-[3rem] rounded-full bg-stone-600 animate-pulse"></div>
                <div className="flex flex-col justify-center  gap-2">
                    <span className="bg-stone-600 p-2 w-[5rem] rounded-xl h-[1rem] animate-pulse"></span>
                    <span className="bg-stone-600 p-2 w-[7rem] rounded-xl h-[1rem] animate-pulse"></span>
                </div>
            </section>
            <div className="w-[8rem] p-5 bg-stone-600 rounded-xl animate-pulse"></div>
        </header>
        <nav className="w-screen flex flex-col items-center mt-3 gap-2">
        {loadArr.map((_, i) => (
        <main key={i} className="w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[40vw] rounded-xl h-[24rem] bg-white shadow-sm">
        <header className="w-full p-2 gap-2 flex items-center">
            <div className="p-2 w-[3rem] h-[3rem] rounded-full bg-stone-600 animate-pulse"></div>
            <span className="w-[4rem] h-[1rem] rounded-2xl p-1 bg-stone-600 animate-pulse"></span>
        </header>
        <article className="w-full h-[13rem] bg-stone-600 animate-pulse"></article>
        <section className="p-3 flex gap-2 items-center">
            <div className="w-[2rem] h-[2rem] rounded-full bg-stone-600 animate-pulse"></div>
            <div className="w-[2rem] h-[2rem] rounded-full bg-stone-600 animate-pulse"></div>
        </section>
    </main>
    ))}
        </nav>
    </main>
  )
}

export default Loading