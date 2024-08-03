const zod = require('zod')

const zSchema = zod.object({
  email: zod.string().email("Invalid Email Format"),
  password: zod.string().min(8,"Minimum 8 characters required"),
});

module.exports ={
  zSchema
}
