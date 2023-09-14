const mongoose= require("mongoose");



mongoose.connect("mongodb+srv://shivamatlas:c8EArpFPe7Pq5fBt@cluster0.mymes8q.mongodb.net/ejs",{}).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log(err)
})




// <% if(message){%>
//     <div class="alert alert-dismissible fade show alert-<%= message.type %>" role="alert">
//     <button class="btn-close" type="button" aria-label="Close" data-bs-dismiss="alert">
        
//     </button>
//     <strong><%= message.message %> </strong>


// </div>


// <% }%> 