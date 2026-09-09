import { useEffect, useRef, useState } from 'react'

/** Fades content in the first time it scrolls into view. */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Anything already on screen at mount is shown straight away. Waiting for
    // the observer would leave the hero blank whenever its callback is delayed
    // — a backgrounded tab, for instance, where intersections are not computed.
    const box = el.getBoundingClientRect()
    if (box.top < window.innerHeight && box.bottom > 0) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)

    // Failsafe: never leave content permanently invisible if the observer
    // never fires. Content is worth more than the animation.
    const failsafe = setTimeout(() => setVisible(true), 3000)

    return () => {
      observer.disconnect()
      clearTimeout(failsafe)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
