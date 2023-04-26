import { Alert, Space } from 'antd'
const ErrorAlert = ({ message, description, type }) => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message={message} description={description} type={type} showIcon />
  </Space>
)
export default ErrorAlert
