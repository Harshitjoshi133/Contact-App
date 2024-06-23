const NotFoundContact = () => {
    return (
      <div className="flex items-center gap-4 justify-center h-[80vh]">
        <div>
          <img src="/contacts.png" alt="No Contacts Found" /> {/* Image for no contacts found */}
        </div>
        <h3 className="text-white font-semibold text-2xl">Not Found</h3> {/* Message for no contacts found */}
      </div>
    )
  }
  
  export default NotFoundContact
  