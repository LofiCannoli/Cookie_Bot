export async function check_Id(client, Id){
  try{
    await client.users.fetch(Id);
  } catch (err){
    if(err) return false;
  };
  return true;
}
