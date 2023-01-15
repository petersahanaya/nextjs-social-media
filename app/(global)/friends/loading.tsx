const FriendLoading = () => {
    const loadArr = [1, 2, 3, 4];
  return (
    <main className="md:pl-20">
        <header className="w-screen h-[14vh] gap-2 p-3 flex flex-col justify-center">
            <div className="w-[9rem] bg-stone-600 rounded-xl p-7 animate-pulse"></div>
            <span className="w-[95vw] bg-stone-600 md:w-[80vw] rounded-xl p-5 animate-pulse"></span>
        </header>
        <section className="mt-4 w-screen">
            {loadArr.map((_, i) => (
                <nav key={i} className="bg-white w-screen p-5">
                    <header className="p-3 w-full flex items-center gap-2">
                            <div className="w-[3rem] h-[3rem] bg-stone-600 animate-pulse rounded-full"></div>
                            <div className="flex flex-col justify-center gap-2">
                                <span className="w-[7rem] bg-stone-600 rounded-xl p-2 animate-pulse"></span>
                                <span className="w-[3rem] bg-stone-600 rounded-xl p-2 animate-pulse"></span>
                            </div>
                    </header>
                    <article></article>
                </nav>
            ))}
        </section>
    </main>
  )
}

export default FriendLoading