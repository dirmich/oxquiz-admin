import swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'

export default {
  ok(title,message) {
    return swal.fire({
      title: title,
      text: message,
      type: "success",
      confirmButtonClass: "blue v-btn v-btn--flat",
      buttonsStyling: false
    })
  },
  error(title,message) {
    return swal.fire({
      title: title,
      text: message,
      type: "warning",
      confirmButtonClass: "red white--text  v-btn v-btn--flat",
      buttonsStyling: false
    })
  },
  select(title,message) {
    return swal.fire({
      title: title,
      // html: `<div class="md-field md-theme-default">
      //   <input type="text" id="md-input" class="md-input">
      //   </div>`,
      text: message,
      showCancelButton: true,
      confirmButtonClass: "blue v-btn v-btn--flat",
      cancelButtonClass: "red white--text v-btn v-btn--flat",
      buttonsStyling: false
    })
  }
}