// pages/index.tsx
import { Button } from "@/Components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Home = async() => {

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
            <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
                <div className="flex flex-col justify center gap-8">
                    <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platforms!</h1>
                    <p className="p-regular-20 md:p-regular-24">
                        Book and learn helpful tips from 2,000+ mentors in world-class companies with our global community
                    </p>
                    <Button asChild size='lg' className="button w-full sm:w-fit">
                        <Link href={'/seshs'}>Start Now</Link>
                    </Button>
                </div>
                <Image
                    src={'/assets/images/hero.png'}
                    alt="hero"
                    width={500}
                    height={500}
                    className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
                />
            </div>
            <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12 ">
        <h2 className="h2-bold">Trusted by <br/> Thousands of Events</h2>
        {/* <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          CategoryFilter
        </div> */}
    </section>
        </section>


        </>
        
    );
};

export default Home;
