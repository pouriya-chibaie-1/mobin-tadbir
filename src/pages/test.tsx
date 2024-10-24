import { useSelector } from "react-redux";

const Test = () => {
    const count = useSelector((state: any) => state.general.count);
    console.log("state",count);
    return (<>
    <h1 className="bg-black text-white h-10">This is test</h1>
    </>  );
}
 
export default Test;