//My Helpers
import { openLinkCallback } from "../helpers/ParseArgument.js";

//React
import { useState } from "react";
import Icon from "../Utilities/Icon";
import Brand from "../../images/Mekani.svg";


export default ()=>{
    //Use State
    const [ loadMore, loadMoreSet ] = useState(false);

    return <footer className="flex justify-center bg-gray-900">

        <main className=" flex flex-wrap gap-10 my-10" style={{width:"70rem"}}>
            <section className="basis-full flex md:flex-nowrap flex-wrap gap-10 sm:px-10 px-5">
                <section className=" grow-0 shrink-0 md:basis-[10rem] basis-full flex justify-center items-center">
                    <div className=" md:w-full w-[10rem]">
                        <div className="relative w-full aspect-square">
                            <img src={Brand} alt="Creator's Logo" className="my-img" />
                        </div>
                    </div>

                </section>
                <section className="flex-1 basis-full mr-auto">
                    <h1 className="my-text-big mb-4 md:text-left text-center">Creator's Message</h1>
                    <p className="text-justify my-subtext">
                    Learning a new instrument will be quite a long journey. We started with the essentials then later on, we put it into practice. But at some point, we will all come across music theory. {loadMore ?"  Because of music theory, there are times where we need to become mathematicians instead of musicians. What we need now is a tool that will aid our memory in grasping those concepts. Forget about paper and pencils, as Musifier, one of the tools out there that may help you in your musical journey. ":"... "}
                        <span className="underline underline-offset-2 font-normal cursor-pointer" onClick={()=>{loadMoreSet(prev=>!prev)}}>
                            Load {loadMore?'less':'more'}
                        </span>
                    </p>
                </section>

                <section className="flex-0 md:basis-auto basis-full">
                    <h1 className="my-text-big mb-4 md:text-start text-center">Socials</h1>
                    <div className="flex gap-5 md:justify-start justify-center">
                        <Icon name="facebook" inClass=" fill-gray-800" outClass=" w-8 h-8 p-1 my-btn"
                            onClick={openLinkCallback('https://www.fb.com/mekaniRxON')}
                        />
                        <Icon name="twitter" inClass=" fill-gray-800" outClass=" w-8 h-8 p-1 my-btn"
                            onClick={openLinkCallback('https://www.twitter.com/Mekani_Tekno')}
                        />
                        <Icon name="youtube" inClass=" fill-gray-800" outClass=" w-8 h-8 p-1 my-btn"
                            onClick={openLinkCallback('https://www.youtube.com/@mekani_tekno')}
                        />
                    </div>
                </section>
            </section>


            <section className="w-full">
                <p className="my-infotext text-center text-slate-500">&#169;Musifier x Mekani_Tekno 2024</p>
            </section>

        </main>


    </footer>
}




