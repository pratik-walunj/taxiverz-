import os

files = [
    "raxaul-to-chitwan.html",
    "raxaul-to-muktinath.html",
    "raxaul-to-lumbini.html",
    "raxaul-to-manokamana.html"
]

section = '''    <!-- Popular Routes Section -->
    <section style="background: linear-gradient(135deg, #2c3e50, #34495e); color: white; padding: 80px 0;">
        <div class="container">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="color: white; margin-bottom: 1rem;">Popular Local Taxi Routes</h2>
                <p style="color: #bdc3c7;">Explore our most frequently booked destinations</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-bottom: 2rem;">
                <a href="gorakhpur-to-nepal.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Nepal</a>
                <a href="gorakhpur-to-ayodhya.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Ayodhya</a>
                <a href="gorakhpur-to-banaras.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Banaras</a>
                <a href="gorakhpur-to-lucknow.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Lucknow</a>
                <a href="gorakhpur-to-kushinagar.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Kushinagar</a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-bottom: 2rem;">
                <a href="gorakhpur-to-janakpur.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Janakpur</a>
                <a href="gorakhpur-to-delhi.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Delhi</a>
                <a href="gorakhpur-to-agra.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Agra</a>
                <a href="gorakhpur-to-chitwan.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Chitwan</a>
                <a href="gorakhpur-to-lumbini.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Lumbini</a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem;">
                <a href="gorakhpur-to-pokhara.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Pokhara</a>
                <a href="gorakhpur-to-patna.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Patna</a>
                <a href="gorakhpur-to-bodhgaya.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Bodhgaya</a>
                <a href="gorakhpur-to-kanpur.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Kanpur</a>
                <a href="gorakhpur-to-prayagraj.html" style="background: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 8px; text-align: center; font-size: 12px; transition: all 0.3s; border: 2px solid #e74c3c;">Gorakhpur To Prayagraj</a>
            </div>
        </div>
    </section>

'''

for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'Popular Local Taxi Routes' not in content:
            content = content.replace('   <footer class="footer">', section + '   <footer class="footer">')
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file}")
        else:
            print(f"Skipped (already has section): {file}")
    except Exception as e:
        print(f"Error with {file}: {e}")

print("Done!")
