import { useState, useEffect, useCallback } from "react";
import JobItems from "./JobItems";
import Buttons from "./Buttons";

const Jobs = () => {
  const url = "https://course-api.com/react-tabs-project";

  const [value, setValue] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json(); // CHYBELO MI ZDE TO AWAIT!
      setJobs(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []); // dependency pro useCallback

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let content = <p>Found no jobs.</p>;

  if (loading) {
    console.log("loading");
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  // POKUD BUDU MIT ZE ZACATKU LOADING(FALSE) A NEBUDU ZDE MIT NASLEDUJICI PODMINKU,
  // TAK MI TO BUDE HAZET ERROR. PROTOZE LOADING SE NASTAVI NA TRUE AZ V TOM FETCHDATA() V USEEFFECTU,
  // ALE PRI PRVNIM RENDERU JSOU JOBS.LENGTH === 0, TAKZE KDYZ JSEM PAK MELA DOLE RETURN (<JOBITEMS JOBDATA={JOBDATA} />),
  // TAK TO HAZELO ERROR, ZE JE TO UNDEFINED, PROTOZE TO JESTE NEBYLO FETCHNUTY, ALE UZ TO CHTELO ODESILAT DATA.
  // PROTO NASTAVIM ABY SE TO VYRENDEROVALO, AZ JE JOBS.LENGTH >0
  /*if (jobs.length > 0 && !loading && !error) {
    const clickHandler = (index) => {
      setValue(index);
    };
    console.log("render");

    const jobData = jobs[value];
    content = (
      <>
        <Buttons jobs={jobs} onClick={clickHandler} active={value} />
        <JobItems jobData={jobData} />
      </>
    );
  }*/
  // JINACI ZPUSOB JAK TO VYRESIT JE DAT JAKO INITIAL VALUE LOADINGU TRUE. PAK NEMUSIM MIT TUHLE PODMINKU S JOBS.LENGTH >0,
  // PROTOZE SE OD ZACATKU BUDE VYPISOVAT JEN TO <P>LOADING...</P> Z TOHO IF. A AZ BUDOU DATA, TAK UZ TA IF PODMINKA NEBUDE SLPNENA,
  // PROTOZE HODIM LOADING NA FALSE A BUDE SE VYPISOVAT TEN DOLNI RETURN S JOB ITEMS.
  // A TAK TO KLIDNE MUZU UDELAT, PROTOZE BUDU FETCHOVAT DATA JEN JEDNOU.
  const jobData = jobs[value];
  
  return (
    <section className="section">
      <div className="title">
        <h2>Our Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">{content}</div>
      <JobItems jobData={jobData} />
    </section>
  );
};

export default Jobs;

/*
DULEZITE POZNAMKY:

*/
