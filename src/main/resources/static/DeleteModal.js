const DeleteModal = document.getElementById('ModalDelete')
DeleteModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const Dbutton = event.relatedTarget
    // Extract info from data-bs-* attributes
    const DuserId = Dbutton.getAttribute('data-bs-userId')
    const DuserFirstName = Dbutton.getAttribute('data-bs-userFirstName')
    const DuserLastName = Dbutton.getAttribute('data-bs-userLastName')
    const DuserAge = Dbutton.getAttribute('data-bs-userAge')
    const DuserEmail = Dbutton.getAttribute('data-bs-userEmail')
    // Update the modal's content.

    const DmodaluserId = DeleteModal.querySelector('#userIdDelete')
    const DmodalFirstName = DeleteModal.querySelector('#userFirstNameDelete')
    const DmodaluserLastName = DeleteModal.querySelector('#userLastNameDelete')
    const DmodaluserAge = DeleteModal.querySelector('#userAgeDelete')
    const DmodaluserEmail = DeleteModal.querySelector('#userEmailDelete')

    DmodaluserId.value = DuserId
    DmodalFirstName.value = DuserFirstName
    DmodaluserLastName.value = DuserLastName
    DmodaluserAge.value = DuserAge
    DmodaluserEmail.value = DuserEmail

})