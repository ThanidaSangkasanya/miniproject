import {seed} from "@/utils/seed_staff";

export default async function Seed() {
 
   
     await seed();

    return (<>
        Seeding complete!
    </>)
}