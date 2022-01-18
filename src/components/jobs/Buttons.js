const Buttons = ({jobs, onClick, active}) => {
    return (
        <div className="btn-container">
           {jobs.map((item,index) => {
            return (<button className={`job-btn ${(active === index) && 'active-btn'}`} key={item.id} onClick={onClick.bind(null,index)}>{item.company}</button>)
        })} 
        </div>
        
    )
}

export default Buttons;