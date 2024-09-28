import Drops from "./Drops.tsx";
import GetCollection from "./GetCollection.tsx";
import placeholder from "../assets/placeholder.png";
import MasonryLayout from "./MasonryLayout.tsx";

interface GetDrops {
    drops: any[]
}

const GetDrops = ({drops}:GetDrops) => {
    return (
        <>
            <MasonryLayout>
                {
                    drops.map((drop: any) =>
                        (drop.description ?
                                <div className={'relative rounded-xl'} key={drop._id}>
                                    <img className={'w-full rounded-xl'} src={drop.src} alt={''}/>
                                    <Drops _id={drop._id}/>
                                </div>
                                :
                                <div key={drop._id}>
                                    <GetCollection button={
                                        <div
                                            className={'w-full relative rounded-xl bg-gray-800 bg-center bg-no-repeat bg-cover'}
                                            style={{backgroundImage: `url( ${drop.src ? drop.src : placeholder})`}}>
                                            <img className={'w-full rounded-xl opacity-0'} src={placeholder}/>
                                            <div
                                                className={'w-full text-xl flex items-center justify-center absolute left-0 top-0 right-0 bottom-0 rounded-xl backdrop-brightness-[.6] bg-black/30'}>
                                                {drop.name}
                                            </div>
                                        </div>
                                    } _id={drop._id} name={drop.name}/>
                                </div>
                        )
                    )
                }
            </MasonryLayout>
        </>
    );
};

export default GetDrops;