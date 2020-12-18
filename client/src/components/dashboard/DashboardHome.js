import React from 'react'

export default function DashboardHome() {
  return (
    <div className="welcome-container">

      <div className="scroll-container one" >
          <div className="one-text">
            <h1>30-DAY-CHALLENGE</h1>
            <h2>Think about something you always wanted to add to your life and try it for the next 30 days...</h2>
            <h2>30 days just about the right amount of time to add a new habit or substract a habit.</h2>
            <h2><strong>So... what are you waiting for?</strong></h2>
          </div>
      </div>

      {/* WHY do it? > video */}
      <div className="scroll-container two">
        <h1>Why do a 30-day challenge?</h1>
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/UNP03fDSj1U"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>

      {/* How do get started? */}
      <div className="scroll-container light three">
        <h1>How to get started?</h1>
        <div className="how-container">
          <div className="how-box step-one">
            <img src="../../images/home1b.png" alt="challenges"/>
            <div className="how-box-text">
              <h3>Challenges</h3>
              <p>30 Day Challenges are a great way of implementing new habits in life, trying 
              new things and undertaking new challenges without putting too much pressure on yourself.
              Pick a challenge for yourself. If you need inspiration, browse ones that others added or 
              create your own. </p>
            </div>
          </div>
          <div className="how-box step-two">
            <div className="how-box-text">
              <h3>Rewards</h3>
              <p>It’s important to stay motivated, and a great way to do that is through a reward 
              system. You'll get an opportunity to earn rewards, say eating your favorite food, 
              by accomplishing a milestone and get a grand prize form reaching the goal goal. 
              This way you find starting to work on your goals much Easier. Again, you can add 
              one of the rewards from existing collections to your favorites or create your own.</p>
            </div>
            <img src="../../images/home2c.png" alt="rewards"/>
          </div>
          <div className="how-box step-three">
            <img src="../../images/home3a.png" alt="progress"/>
            <div className="how-box-text">
              <h3>Progress</h3>
              <p>Track your progress. Checking each day on our virtual calendar encourages you 
              to complete your desired task every single day. The more you look at an growing 
              streak, the more compulsion you feel to get over any initial resistance and 
              motivate yourself to keep going. </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips on how to make the habits stick */}
      <div className="scroll-container dark four">
        <div className="tips">
          <h1>Tips and tricks </h1>
          <ul>
            <li>Focus on 1 habit at the time</li>
            <li>Commit to a minimum of 30 days</li>
            <li>Anchor a new habit to an established routine</li>
            <li>Take baby steps - micro commitments</li>
            <li>Don’t break the chain. </li>
            <li>Plan for obstacles and challenges</li>
            <li>Create accountability for your work habit</li>
            <li>Reward important milestones</li>
            <li>Build a new identity</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
