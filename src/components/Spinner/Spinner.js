import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import './Spinner.css'
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 150,
    }}
    spin
  />
)
const Spinner = () => <Spin className="spinner" indicator={antIcon} />
export default Spinner
