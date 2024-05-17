import Fretboard from "../Elements/Guitar/Fretboard"
import PagePlate from "../PagePlate/PagePlate"
import Icon from "../Utilities/Icon";

//Images
import instrument from "../../images/homepage/instruments.jpg";
import guitar from "../../images/homepage/guitar.jpg";
import headphone from "../../images/homepage/headphone.jpg";
import musifierLogo from "../../images/logo/Musifier_Logo.svg";



export default ()=>{
    return <PagePlate>
        {/*page 1*/}
        <main className={` sm:px-10 px-5 flex justify-center bg-blue-900 bg-blend-multiply bg-opacity-[0.9] bg-center bg-cover bg-local`} style={{backgroundImage: `url(${instrument})`}}>
            <article className='relative w-[70rem] pt-36 pb-36 min-h-screen'>
                {/*First Attachment*/}
                <section >
                    <h6 className='my-text pb-4'>
                        <span className='text-slate-400'>WELCOME TO</span>
                        <span className='text-blue-300'> MUSIFIER</span>
                    </h6>
                    <h1 className="my-header">Learn the <span className='text-blue-300'>Music</span></h1>
                    <h1 className="my-header">Apply the <span className='text-blue-300'>Theory</span></h1>
                    <h1 className="my-header">Make your <span className='text-blue-300'>Sound</span></h1>
                </section>
                {/*2nd Attachment*/}
                <section className='pt-20'>
                    <p className='my-text text-justify'>
                    Eager to help you scale your skill to a greater level. A zealous to keep playing your instrument whenever you are. There is no best time to start your journey in music, so start today and experience the beat of life.
                    </p>
                </section>
                {/*3rd Attachment*/}
                <section className='w-full absolute bottom-32  md:flex hidden justify-center'>
                    <Icon name="naturalNote" inClass="fill-slate-300" outClass="w-20 animate-bounce"/>
                </section>
            </article>
        </main>

        {/*page 2*/}
        <main className=' sm:px-10 px-5 flex justify-center bg-gray-800'>
            <article className='pt-32 pb-32 flex gap-x-10 sm:flex-nowrap flex-wrap' style={{width:"70rem"}}>

                <section className='flex-0 shrink mb-8'>
                    <div className="relative sm:w-[13rem] w-[6rem] aspect-square" >
                        <img src={musifierLogo} alt="Creator's Logo" className="my-img" />
                    </div>
                </section>

                <section className='flex-1 flex flex-col justify-center sm:mt-auto'>
                    {/*First Attachment*/}
                    <section className=''>
                        <h1 className="my-header-flat text-slate-200 break-words">WHAT IS MUSIFIER?</h1>
                    </section>
                    {/*2nd Attachment*/}
                    <section className='md:mt-10 sm:mt-5 sm:block hidden'>
                        <p className='my-text text-justify'>
                            Musifier is a web application that you can use to learn your favorite instruments. It also comes with other resources that you may need in learning music theory. One of its greatest feature is that you can learn and create musical scales that suits to your need. No need to be tech savvy, just click what sounds right to you.
                        </p>
                    </section>
                </section>
                {/*2nd Attachment*/}
                <section className=' mt-2 sm:hidden block'>
                    <p className='my-text text-justify'>
                        Musifier is a web application that you can use to learn your favorite instruments. It also comes with other resources that you may need in learning music theory. One of its greatest feature is that you can learn and create musical scales that suits to your need. No need to be tech savvy, just click what sounds right to you.
                    </p>
                </section>


            </article>
        </main>

        {/*page 3*/}
        <main className=' sm:px-10 px-5 flex justify-center bg-blue-900 bg-blend-multiply bg-opacity-[0.9] bg-center bg-cover bg-local' style={{backgroundImage:`url(${guitar})`}}>
            <article className='w-[70rem] py-32'>
                {/*First Attachment*/}
                <section >
                    <h1 className={`my-header-flat text-slate-200 text-center`}>Guitar Fretboard</h1>
                </section>
                {/*2nd Attachment*/}
                <section className='pt-10'>
                    <p className='my-text text-justify'>
                        Having a hard time being acquainted with your fret-board? With Musifier, it can help you to familiarize your fret-board. It has a virtual fret-board that contains all notes of a standard 24 fret electric guitar. You can use the scale pattern to show what strings you should pick. You can try the built-in algorithm to guess what scale the song you are playing and roam around the fret-board to determine the best location to play the notes.
                    </p>
                </section>
                {/*3rd Attachment*/}
                <section className='mt-10 sm:px-10'>
                    <div className='aspect-video'>
                        <div className='w-full h-full bg-blue-800'>

                        </div>
                    </div>
                </section>
            </article>
        </main>

        {/*page 4*/}
        <main className=' sm:px-10 px-5 flex justify-center bg-blue-900 bg-blend-multiply bg-opacity-[0.9] bg-center bg-cover bg-local' style={{backgroundImage:`url(${headphone})`}}>
            <article className='w-[70rem] py-48'>
                {/*First Attachment*/}
                <section className=''>
                    <h1 className={`my-title-big text-slate-200 text-center`}>and many more...</h1>
                </section>
                {/*2nd Attachment*/}
                <section className='pt-10'>
                    <p className='my-text text-center'>
                        The web application is still in BETA, so expect more to come.
                    </p>
                </section>
            </article>
        </main>


    </PagePlate>
}
