const ListLoading = () => {
    const loadArr = [1, 2, 3, 4];
  return (
    <section className="mt-4 w-screen md:pl-20 lg:pl-20 xl:pl-20">
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
  )
}

export default ListLoading