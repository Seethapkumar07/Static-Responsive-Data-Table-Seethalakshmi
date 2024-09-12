async function Logic() {
    let studentData = [];

    try {
        const response = await fetch('/HTML/static.json');
        if (!response.ok) {
            throw new Error("Please provide a correct response");
        }
        
        const data = await response.json();
        console.log("=============", data);

        studentData = data.studentData;
        if (Array.isArray(studentData)) {
            renderTable(studentData);
        } 
    } catch (error) {
        console.error(error);
    }

   
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const searchQuery = document.getElementById('search-input').value.toLowerCase();
        const filteredData = studentData.filter(student => student.name.toLowerCase().includes(searchQuery));
        renderTable(filteredData);
    });
}

function renderTable(data)  { 
    const html = `
        <div class="table-responsive">
            <table class="table table-bordered mt-2">
                <thead class="text-center">
                    <tr>
                        <th>Sl.No</th>
                        <th>Student's Name</th>
                        <th>Father's Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>Department</th>
                        <th>Academic Year</th>
                        <th>Scholarship</th>
                        <th>Action</th>  
                    </tr>
                </thead>
                <tbody>
                    ${data.map((student,id) => {
                        return `
                        <tr class="text-center" key=${id}>
                            <td>${student.slno}</td>
                            <td class="text-start">
                                <img class="rounded-circle border" src="${student.image}" alt="${student.name}" style="max-width: 50px; max-height: 50px;">
                                ${student.name}
                            </td>
                            <td>${student.father}</td>
                            <td>${student.dob}</td>
                            <td>${student.gender}</td>
                            <td>${student.city}</td>
                            <td>${student.Department}</td>
                            <td>${student.Academic}</td>
                            <td>${student.Scholarship}</td>
                            <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal1" onclick = ${alertDetails(data)}>Action</button></td>
                        </tr>`;
                    }).join("")}
                </tbody>
            </table>
        </div>
    `;

   
    document.querySelector('#app').innerHTML = html;
}

function alertDetails(data){
    data.map((stu,id)=>{
        ` <div class="modal fade" id="myModal1" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" key=${id}>
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="modalLabel">Student's Information</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body" key=${stu.slno}>
                  <img src=${stu.image}>
                      <div class="row mt-2">
                      <div class="col">Name </div>
                      <div class="col">: ${stu.name}</div></div>
                      <div class="row">
                      <div class="col">Father's Name </div>
                      <div class="col">: ${stu.father}</div></div>
                      <div class="row">
                      <div class="col">DOB </div>
                      <div class="col">: ${stu.dob}</div></div>
                      <div class="row">
                      <div class="col">Gender </div>
                      <div class="col">: ${stu.gender}</div></div>
                      <div class="row">
                      <div class="col">City </div>
                      <div class="col">: ${stu.city}</div></div>
                      <div class="row">
                      <div class="col">Departments </div>
                      <div class="col">:${stu.Department}</div></div>
                      <div class="row">
                      <div class="col">Academic Year </div>
                      <div class="col">: ${stu.Academic}</div></div>
                      <div class="row">
                      <div class="col">Scholarship </div>
                      <div class="col">: ${stu.Scholarship}</div></div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                  </div>
              </div>
          </div>
      </div>`
    })
}

Logic();
