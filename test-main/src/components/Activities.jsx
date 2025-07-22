import React from 'react';
import { motion } from 'framer-motion';
import { Book, Heart, Users, BugPlay as Pray, Home, UserCheck } from 'lucide-react';

function Activities() {
  const activities = [
    {
      icon: Book,
      title: "Sunday School",
      time: "9:00 AM",
      description: "Biblical education for all ages with dedicated teachers and engaging lessons.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Heart,
      title: "Sunday Worship",
      time: "12:30 PM",
      description: "Powerful worship service with anointed preaching and spirit-filled praise.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Bible Class",
      time: "Wednesday 7:00 PM",
      description: "Deep dive into God's Word with interactive study and fellowship.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Pray,
      title: "Fasting Prayer",
      time: "Friday 6:00 AM",
      description: "Seeking God's face through prayer and fasting for breakthrough.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Home,
      title: "Cottage Meeting",
      time: "Saturday 6:00 PM",
      description: "Intimate fellowship and prayer in homes throughout the community.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: UserCheck,
      title: "Discipleship Meeting",
      time: "Thursday 7:00 PM",
      description: "Growing in faith through mentorship and spiritual development.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section id="activities" className="section-padding bg-gray-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Church <span className="gradient-text">Activities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us throughout the week for worship, fellowship, and spiritual growth. 
            Every gathering is an opportunity to experience God's presence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg card-hover p-8"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${activity.color} rounded-full flex items-center justify-center mb-6`}>
                <activity.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
              <p className="text-lg font-semibold text-purple-600 mb-4">{activity.time}</p>
              <p className="text-gray-600 leading-relaxed">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Activities;