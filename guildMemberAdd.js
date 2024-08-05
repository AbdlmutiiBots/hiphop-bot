module.exports = {
name: "guildMemberAdd",
once: false,
run: (m) {
  if(m.guild.id === "855466380052791306" && m.user.bot === false) {
    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(400, 200)
    const ctx = canvas.getContext('2d');
    let back = await Canvas.loadImage('https://lh3.googleusercontent.com/fife/AAWUweXebXko2hITW3pf4kiQ4SYrqW-0pyHTSj3GD_N6fhSJSB3nBf5sqf17FcWNmdHUkH_eeCvSq2TU2IIE3UHf5_eXFCDes1r4fYKGEphqtGPoO2aT_LMGes9H8bBw-oNsL2W4XlUwzl7QWKjGKS4qvRsvR8iv4RjRDjfUVTC0_IL57Th1RD0LMkrGyX-bG3tqnfWFAJrq0muPlQcKadLMz6N2KU9WRcbcUFEwjYWrEF22GEUfzssKEFJgVyl04IZChFhKNrDRIcjfUl2pdYTUYss9NOWOQ6g7wpuNAGr5GnJ1sjr_F-y6F2TSbB4VbhwqeKVrTC1zNAqX0IinMfc5A22sEK260EC1LPnAjHapRRqShS5IVdCXyjSOIXSuRGUfIlAFHvHIGxa9ILtrJInVhKOP_1burfqV1Bgaq7IxseX3bjwdaBj8LF-QsQQbblfzWI1klK46ZdpBg4ZOWG37Ki9oico0RL2tpFoYqME5PUB745uTdZ7bQzt_4gaP7SwR5VV1maa4irnMuBLnJh696dBgXG4InU-A29ZcMrn5bIBCwGsHZb7NmiF9FNh2C1DMCn4hGpCzQ0yhwBZhKSqsnS6g70oQ7ibpyAYLgjTvcOHtOJD-TCtpqoWLU6kcIZhpMM5No4y-y-OrmjukfJESQPo0I_Zg0tiEQoMlTIQ43iSIDvPOnyLLCvXkQiR4Dl2LPGzkQbSSo1lGAz0f9TDfYU_IDgKhXjFveA=w1919-h876-ft');
    const editor = require("editor-canvas");

    let circle = await editor.drawCircle({ image: m.user.displayAvatarURL({format: "png"}) });
    let avatar = await Canvas.loadImage(circle);
    
   ctx.drawImage(back, 0, 0, canvas.width, canvas.height);
ctx.drawImage(avatar, 256.5, 66, 70, 70); 
    Canvas.registerFont('Cairo-Bold.ttf', { family: 'Cairo', weight: 'bold' });
    ctx.font = '25px Cairo';
  }
 }
}