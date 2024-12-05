import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";

interface ListDataProps {
  minAge: number;
  maxAge: number;
}

export default function ListData({ minAge, maxAge }: ListDataProps) {
  const friends = useLiveQuery(
    async () => {
      //
      // Query Dexie's API
      //
      const friends = await db.friends
        .where("age")
        .between(minAge, maxAge)
        .toArray();

      // Return result
      return friends;
    },
    // specify vars that affect query:
    [minAge, maxAge]
  );

  return (
    <div>
      <ul>
        {friends?.map((friend) => (
          <li key={friend.id}>
            {friend.name}, {friend.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
