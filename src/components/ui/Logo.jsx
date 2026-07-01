export default function Logo({ size = 32 }) {
  return (
    <img 
      src="/logo.jpeg" 
      alt="Still Weld Logo" 
      style={{ 
        width: size, 
        height: size, 
        objectFit: 'cover', 
        borderRadius: '20%', 
        display: 'block' 
      }} 
    />
  )
}
