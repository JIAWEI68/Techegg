import { FormControl, FormGroup } from '@angular/forms';
export function passwordMatchValidator(pwSet: FormGroup) {
  var password = pwSet.controls.password.value;
  var confirmPassword = pwSet.controls.confirmPassword.value;
  if (!(password === confirmPassword)) return { notmatch: true };
  return null;
}
