import Button from "@/components/ui/Button";
import { db } from "@/lib/db";

export default async function Home() {

  await db.set('hello', 'world');
  
  return (
    <div className="text-red-500 text-2xl">
      <Button size={'lg'} variant={'ghost'}>
        Hello
      </Button>
    </div>
  );
}
