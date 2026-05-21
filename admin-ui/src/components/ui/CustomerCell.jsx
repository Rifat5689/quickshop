import Avatar from './Avatar'

const CustomerCell = ({ name, phone, index = 0 }) => (
  <div className="td-user">
    <Avatar name={name} index={index} />
    <div className="min-w-0">
      <div className="td-user-name">{name}</div>
      <div className="td-user-sub">{phone}</div>
    </div>
  </div>
)

export default CustomerCell
