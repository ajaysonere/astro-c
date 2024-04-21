

/*
    This componet will help to identify the user , if user does not have accesss to content , we simply tell them , you do not have access to this content. 
    
*/


const Unauthorized = () => {
    return (
       <section className="container unauthorized__container">
           <div className="unauthorized__content">
               <h1>You Do not have access to this content !</h1>
           </div>
       </section>
    );
};

export default Unauthorized;