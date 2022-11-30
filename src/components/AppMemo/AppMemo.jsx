// демка работы с большими данными, требующими ресурсы и оптимизации этих процессов с помощью useMemo

import { useMemo, useState } from "react";
import Logo from "../Logo/Logo";

function createUser(name) {
  const user = { name };
  let i = 0;
  while (i < 1000000000) i++;
  console.log(user);
  return user;
}

const AppMemo = () => {
  const [name, setName] = useState("");
  const [counter, setCounter] = useState(0);
  const user = useMemo(() => createUser(name), [name]);

  return (
    <>
      <div >
        <button onClick={() => setCounter(counter + 1)}>
          I AM PUSHED {counter} TIMES
        </button>
        <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} />
        <pre>
            {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default AppMemo;
