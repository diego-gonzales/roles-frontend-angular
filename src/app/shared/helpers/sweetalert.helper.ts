import Swal from 'sweetalert2';


export const showLoading = ( message: string ) => {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
    });

    Swal.showLoading();
};

export const closeLoading = () => {
    Swal.close();
};


export const showErrorMessage = (message: string, text?: string) => {
    Swal.fire({
        icon: 'error',
        text: message,
        // title: ''
        // text: text ? text : ''
    });
};

export const confirmDialog = (message?: string) => {
    return Swal.fire({
        // title: 'Are you sure?',
        text: "Are you sure to delete this record?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });
};